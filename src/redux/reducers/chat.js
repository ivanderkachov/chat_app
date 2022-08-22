import axios from "axios";

const GET_CONVERSATIONS = 'GET_CONVERSATIONS'
const GET_USERS = 'GET_USERS'
const USER_LOGIN = 'USER_LOGIN'
const USER_LOGOUT = 'USER_LOGOUT'

    // _id: "62fc9ebf16a6a499bb086842",
    // name: "John",
    // email: "test@gmail.com"

const initialState = {
  user: {},
  users: {},
  conversations: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        user: action.user,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        user: action.user,
        users: action.users,
        conversations: action.conversations
      };
    }
    case GET_CONVERSATIONS: {
      return {
        ...state,
        conversations: action.conversations,
      };
    }
    case GET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    default:
      return state;
  }
}

export function logIn(form) {
  return (dispatch) => {
    return axios.post('/api/v1/join',
      { ...form },
      { headers: { "Content-type": "application/json" } }
      )
      .then(({ data }) => {
        const user = data.user
        localStorage.setItem("userData", JSON.stringify(user));
        dispatch({
          type: USER_LOGIN,
          user,
        });
      })
      .catch(({response}) => {
        alert(response.data.status)
        dispatch({
          type: USER_LOGIN,
          user: {},
        });
      })

  }
}
export function logOut() {
  return {
    type: USER_LOGOUT,
    user: {},
    users: {},
    conversations: {}
  }
}

export function getConversations(userId) {
  return (dispatch) => {
    return axios(`/api/v1/conversations/${userId}`)
      .then(({ data }) => {
        const  conversations = data.conversations.reduce((acc,rec) => {
          return { ...acc, [rec._id]:rec }
        }, {})
        dispatch({
          type: GET_CONVERSATIONS,
          conversations
        })
      })
  }
}

export function getUpdatedConversations(userId, friendId) {
  return (dispatch) => {
    return axios(`/api/v1/conversations/${userId}/${friendId}`).then(({ data }) => {
      const conversations = data.conversations.reduce((acc, rec) => {
        return { ...acc, [rec._id]: rec };
      }, {});
      dispatch({
        type: GET_CONVERSATIONS,
        conversations,
      });
    });
  };
}

export function getUsers() {
  return (dispatch) => {
    return axios('/api/v1/users')
      .then(({ data }) => {
        const users = data.users.reduce((acc, rec) => {
          return { ...acc, [rec._id]:rec }
        }, {})
        dispatch({
          type: GET_USERS,
          users
        })
      })
  }
}

export function postMessage(_id, message) {
  return (dispatch) => {
    return axios.post(
      `/api/v1/messages/${_id}`,
       { ...message },
       { headers: { "Content-type": "application/json" }
      })
      .then(({ data }) => {
        const conversations = data.conversations.reduce((acc, rec) => {
          return { ...acc, [rec._id]: rec}
        }, {})
        dispatch({
          type: GET_CONVERSATIONS,
          conversations
        })
      })
  }
}

export function postMessageCN(conversationId, userId, message) {
  return (dispatch) => {
    return axios
      .post(
        `/api/v1/messages/cn/${conversationId}/${userId}`,
        { ...message },
        { headers: { "Content-type": "application/json" } }
      )
      .then(({ data }) => {
        const conversations = data.conversations.reduce((acc, rec) => {
          return { ...acc, [rec._id]: rec };
        }, {});
        dispatch({
          type: GET_CONVERSATIONS,
          conversations,
        });
      });
  };
}