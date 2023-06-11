export class Services {
  getServer() {
    return "https://localhost:7142";
  }
  getClientDomain() {
    return "https://localhost:44466";
  }
  token() {
    return localStorage.getItem("authToken");
  }
  getAbsolutePath(loc) {
    const domain = this.getClientDomain();
    const domainLimit = domain.length;
    return loc.substring(
      domainLimit,
      loc.length
    );
  }

  isLoggedIn() {
    if (this.token() === null) {
      return Promise.resolve({value: false});
    }
    return fetch(this.getServer() + "/auth/check/", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token(),
      },
    })
      .then((rsp) => rsp.json())
      .then((response) => {
        return response;
      });
  }

}
