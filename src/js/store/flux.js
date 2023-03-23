const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			list: [
				"Wash the dishes",
				"Go to work"
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color, todo) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				const list = store.list.map((elm, i) =>{
					if (i === index) elm = todo;
					console.log("Elm",elm)
					return elm;
				})

				//reset the global store
				setStore({ demo: demo });
			},

			todoList: (todo) => {
				const store = getStore();
				setStore({ list: [...store.list, todo]})
				return store.list
			},
			deleteTask: (id) => {
				const store = getStore();
				//Create a new array without the task corresponding to id
				setStore({ list: store.list.filter((item, index)=>{
					return index != id
				})
			})
				return store.list
			}
		}
	};
};

export default getState;
