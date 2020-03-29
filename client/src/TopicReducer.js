// TopicReduzer.js

const reducerTopic = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'initialize':
      return action.data;

    case 'adminAddTopic':
      newState.push({
        topic_id: action.topic_id,
        topic: action.topic
      });
      return newState;

    case 'adminChangeTopic':
      newState.forEach(topic => {
        if (topic.topic_id === action.topic_id) topic.topic = action.topic;
      });
      return newState;

    case 'adminDeleteTopic':
      newState.splice(action.topicIndex, 1);
      return newState;
    default:
      throw new Error();
  }
};

export default reducerTopic;
