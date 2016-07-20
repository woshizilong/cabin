/*
  Copyright 2015 Skippbox, Ltd

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import ListItem from 'components/commons/ListItem';

const {
  View,
  Slider,
  Text,
  StyleSheet,
} = ReactNative;

const { PropTypes } = React;

const styles = StyleSheet.create({
  listItem: {
    height: 75,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1,
    marginRight: -10,
  },
  slider: {
    flex: 1,
    marginTop: -4,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  detail: {
    fontSize: 15,
  },
});

export default class ReplicationsSlider extends Component {

  static propTypes = {
    replication: PropTypes.instanceOf(Immutable.Map),
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: props.replication.getIn(['spec', 'replicas']),
    };
  }

  render() {
    const { replication } = this.props;
    return (
      <ListItem style={styles.listItem} renderTitle={() => {
        return (
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.title}>Desired</Text>
              <Text style={styles.detail}>{this.state.sliderValue}</Text>
            </View>
            <Slider style={styles.slider} minimumValue={1} maximumValue={20} step={1} value={replication.getIn(['spec', 'replicas'])}
              onValueChange={(sliderValue) => this.setState({sliderValue})}
              onSlidingComplete={this.props.onSubmit}/>
          </View>
        );
      }}
      />
    );
  }

}