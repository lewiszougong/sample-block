// Wait for the document to load before we doing anything
document.addEventListener("DOMContentLoaded", function main() {
  // setup our ui event handlers
  setupEventHandlers();
});

function setupEventHandlers() {
  // Listen to events on the form
  document
    .getElementById("select-file")
    .addEventListener("click", onSelectFileButtonClick);
  document
    .getElementById("selected-file")
    .addEventListener("click", onSelectedFile);

  const myModalEl = document.getElementById("exampleModal");
  myModalEl.addEventListener("hidden.bs.modal", function (event) {
    resetAfterCloseModal();
  });
}

let TermAndConditionConsent = [];

function resetAfterCloseModal() {
  const filesContent = document.querySelector("#files-content");
  const selectButton = document.querySelector("#selected-file");

  filesContent.innerHTML = "";
  TermAndConditionConsent = [];
  selectButton.setAttribute("disabled", null);
}

async function onSelectFileButtonClick() {
  const el = document.querySelector("#files-content");
  const fileStatus = document.querySelector("#file-status");
  fileStatus.textContent = "";

  resetAfterCloseModal();

  const response = await fetch(
    "https://cdx-cms.dev.depthcon1.com/consents?Type=TermAndConditionConsent"
  );
  const mapResponseToJson = await response.json();

  TermAndConditionConsent = mapResponseToJson;

  for (let i = 0; i < mapResponseToJson.length; i++) {
    let div = document.createElement("div");
    div.addEventListener("click", function () {
      onSelecteFileClick(mapResponseToJson[i]);
    });
    div.className = "col-6 p-2 card-content";
    div.id = `content-${mapResponseToJson[i].id}`;
    div.innerHTML = `<div class="card custom-file-content">
    <img src="https://scbcare.scb.co.th/assets/images/services/scb-care-team.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h6 class="mt-2">${mapResponseToJson[i].Name}</h6>
       ${mapResponseToJson[i].Consent}
      </div>
  </div>`;
    el.appendChild(div);
  }
}

function onSelecteFileClick(data) {
  console.log("select");
  const selectedFile = document.querySelector("#selected-file");
  const selectedFileId = selectedFile.getAttribute("file-id");

  const cardContent = document.querySelector(`#content-${data.id}>div`);

  const allContentActive = document.querySelectorAll(".content-active");

  // if (allContentActive && allContentActive.length > 0) {
  //   [...allContentActive].forEach((el) => {
  //     el.classList.remove("content-active");
  //   });
  // }

  // if (data.id != selectedFileId && selectedFileId) {
  //   const previousSelected = document.querySelector(
  //     `#content-${selectedFileId}>div`
  //   );
  //   previousSelected.classList.remove("content-active");
  // }

  if (data.id == selectedFileId) {
    cardContent.classList.remove("content-active");
    selectedFile.setAttribute("disabled", null);
    selectedFile.removeAttribute("file-id");
  } else {
    if (allContentActive && allContentActive.length > 0) {
      [...allContentActive].forEach((el) => {
        el.classList.remove("content-active");
      });
    }

    cardContent.classList.add("content-active");
    selectedFile.removeAttribute("disabled");
    selectedFile.setAttribute("file-id", data.id);
  }
}

function onSelectedFile() {
  console.log("selected");

  const el = document.querySelector("#selected-file");
  const fileStatus = document.querySelector("#file-status");
  const fileId = el.getAttribute("file-id");
  console.log(fileId);

  const findFile = TermAndConditionConsent.find((item) => item.id == fileId);
  fileStatus.textContent = findFile.Name;

  $("#exampleModal").modal("hide");
}
