import Http from "../../utils/server";

const ADDBOOK = 'ADDBOOK';
const DELBOOK = "DELBOOK";

let addaction = (message) => {
    return {
        type: ADDBOOK,
        message
    }
}
let delaction = (bid) => {
    return {
        type: DELBOOK,
        bid
    }
}
let setbook = (state = [], action) => {
    switch (action.type) {
        case ADDBOOK:
            return [...state, ...action.message]
        case DELBOOK:
            return state.filter(x=>x.id!==action.bid) 
        default:
            return state
    }
}
let getlist = () => {
    return (dispatch) => {
        Http.post("getclass", {})
            .then(rec => {
                dispatch(addaction(rec.data.data));
            })
            .catch(err => {
                console.log(err);
            });
    }
}
let dellist = (bid) => {
    return (dispatch) => {
        Http.post("getclass", {
                id: bid
            })
            .then(rec => {
                if (rec.data.code === 200) {
                    dispatch(delaction(bid));
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}
export {
    addaction,
    delaction,
    setbook,
    getlist,
    dellist,
}