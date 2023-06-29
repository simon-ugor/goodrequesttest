export async function contributionPost(firstName: string, lastName: string, email: string, phone: string, value: number, shelterID: number) {
    const res = await fetch("https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/contribute", {
        method: "POST",
        body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "value": value,
            "shelterID": shelterID
        }),
        headers: {
          "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
}
