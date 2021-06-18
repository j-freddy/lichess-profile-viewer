const DOMAIN_NAME = "https://lichess.org";

export const retrieveUserData = async (username) => {
	try {
		const req = `${DOMAIN_NAME}/api/user/${username}`;
		const response = await fetch(req);
		const data = await response.json();

		return data;
	} catch(e) {
		console.log("Error retrieving LiChess user data: " + username);
	}
}
