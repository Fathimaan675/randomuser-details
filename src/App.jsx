import React, { useState, useEffect } from 'react';

function App() {
  const [userDetails, setUserDetails] = useState({
    id: "Default ID",
    firstName: "Default First Name",
    lastName: "Default Last Name",
    maidenName: "Default Maiden Name",
    age: "Default Age",
    address: {
      address: "Default Address"
    },
    image: "" // You might want to provide a default image URL here
  });

  const [boxColor, setBoxColor] = useState('#FFFFFF'); // Initial color white

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const fetchRandomUser = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      const randomUserIndex = Math.floor(Math.random() * userData.users.length);
      const randomUser = userData.users[randomUserIndex];
      setUserDetails(randomUser);
      changeBoxColor();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const changeBoxColor = () => {
    const randomColor = getRandomColor();
    setBoxColor(randomColor);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{textAlign:'center' ,height:'400px', marginTop:'5px'}}>
      
      <div style={{ backgroundColor: boxColor, padding: '20px', marginTop: '10px', height:'200px',width:'1000px', alignItems:'center',margin:'auto' }}>
        {userDetails && (
          <div className='col-lg-12'>
            <h1>Random User Details</h1>
            {userDetails.image && <img src={userDetails.image} alt="User" />}
            <p style={{textAlign:'left'}}>ID: {userDetails.id}</p>
            <p style={{textAlign:'right'}}>First Name: {userDetails.firstName}</p>
            <p style={{textAlign:'left'}}>Last Name: {userDetails.lastName}</p>
            <p>Maiden Name: {userDetails.maidenName}</p>
            <p style={{textAlign:'right'}}>Age: {userDetails.age}</p>
            <p>Address: {userDetails.address.address}</p>
           
            <p style={{textAlign:'left'}}>university: {userDetails.university}</p>
        
            <p style={{textAlign:'right'}}>phone: {userDetails.phone}</p>
         <button onClick={fetchRandomUser} style={{ bottom: '10px', right: '10px', color:'white',backgroundColor:'black', borderRadius:'10px'}}>Refresh</button>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
