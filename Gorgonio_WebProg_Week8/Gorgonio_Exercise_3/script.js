// Fetch data from a public API
fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
        const user = data.results[0];
        const userDataDiv = document.getElementById('userData');

        userDataDiv.innerHTML = `
            <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <img src="${user.picture.medium}" alt="User Image">
        `;
    })
    .catch(error => console.error('Error fetching data:', error));
