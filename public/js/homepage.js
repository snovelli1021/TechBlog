const dashboard = async () => {
  const response = await fetch("/dashboard", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#Dashboard").addEventListener("click", dashboard);
