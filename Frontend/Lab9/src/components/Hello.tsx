import React from 'react';
const Hello = (props) => {
//we expect props to have a property called name
const greeting = `Hello ${props.name}`;
return <h1>{greeting}</h1>;
}
export default Hello;