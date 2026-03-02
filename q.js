let currentDataURL = "";

function generateQR() {
  const text = document.getElementById("qrText").value;
  const fgColor = document.getElementById("fgColor").value;
  const bgColor = document.getElementById("bgColor").value;
  const format = document.getElementById("format").value;
  const qrContainer = document.getElementById("qrContainer");
  qrContainer.innerHTML = ""; // Clear previous QR

  const options = {
    color: {
      dark: fgColor,
      light: bgColor
    }
  };

  if (format === "svg") {
    QRCode.toString(text, { ...options, type: "svg" }, function (err, svg) {
      if (err) return console.error(err);
      qrContainer.innerHTML = svg;
      currentDataURL = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  } else {
    QRCode.toDataURL(text, { ...options, type: `image/${format}` }, function (err, url) {
      if (err) return console.error(err);
      const img = document.createElement("img");
      img.src = url;
      img.alt = "QR Code";
      qrContainer.appendChild(img);
      currentDataURL = url;
    });
  }
}

function downloadQR() {
  if (!currentDataURL) return alert("Please generate a QR code first.");
  const format = document.getElementById("format").value;
  const link = document.createElement("a");
  link.href = currentDataURL;
  link.download = `qr-code.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function openQR() {
  if (!currentDataURL) return alert("Please generate a QR code first.");
  window.open(currentDataURL, '_blank');
}
