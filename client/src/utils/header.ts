export const header = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")!);
  const temporaryUserId = localStorage.getItem("temporaryUser");

  if(token === null){
    console.log('Token null')
  }

  const httpHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-User-ID": user ? user.id : temporaryUserId,
  };

  return httpHeaders;
};