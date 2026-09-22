const renderGifts = async () => {
  const response = await fetch("/gifts");
  const data = await response.json();

  const requestedURL = window.location.pathname.split("/").pop();
  const giftContent = document.getElementById("gift-content");
  const mainContent = document.getElementById("main-content");
  let gift = null;

  if (requestedURL === "") {
    if (data) {
      data.map((gift) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const topContainer = document.createElement("div");
        topContainer.classList.add("top-container");

        const bottomContainer = document.createElement("div");
        bottomContainer.classList.add("bottom-container");

        topContainer.style.backgroundImage = `url(${gift.image})`;

        const name = document.createElement("h3");
        name.textContent = gift.name;
        bottomContainer.appendChild(name);

        const pricePoint = document.createElement("p");
        pricePoint.textContent = "Price: " + gift.pricePoint;
        bottomContainer.appendChild(pricePoint);

        const audience = document.createElement("p");
        audience.textContent = "Great For: " + gift.audience;
        bottomContainer.appendChild(audience);

        const link = document.createElement("a");
        link.textContent = "Read More >";
        link.setAttribute("role", "button");
        link.href = `/gifts/${gift.id}`;
        bottomContainer.appendChild(link);

        card.appendChild(topContainer);
        card.appendChild(bottomContainer);

        mainContent.appendChild(card);
      });
    } else {
      const message = document.createElement("h2");
      message.textContent = "No Gifts Available 😞";
      mainContent.appendChild(message);
    }
  } else {
    const requestedID = parseInt(requestedURL);

    if (data !== null) {
      gift = data.find((gift) => gift.id === requestedID);
    }

    if (gift && giftContent) {
      const image = document.getElementById("image");
      const name = document.getElementById("name");
      const submittedBy = document.getElementById("submittedBy");
      const submittedOn = document.getElementById("submittedOn");
      const pricePoint = document.getElementById("pricePoint");
      const audience = document.getElementById("audience");
      const description = document.getElementById("description");

      image.src = gift.image;
      image.alt = gift.name;
      name.textContent = gift.name;
      submittedBy.textContent = `Submitted by: ${gift.submittedBy}`;
      submittedOn.textContent = `Submitted on: ${new Date(gift.submittedOn).toLocaleDateString()}`;
      pricePoint.textContent = `Price Point: ${gift.pricePoint}`;
      audience.textContent = `Great For: ${gift.audience}`;
      description.textContent = gift.description;
    } else {
      window.location.href = "/404.html";
    }
  }
};

renderGifts();
