window.addEventListener("unichat:loaded", ({ detail: event }) => {
    console.log("Unichat loaded");
});

window.addEventListener("unichat:connected", ({ detail: event }) => {
    console.log("Unichat connected");
});

window.addEventListener("unichat:event", ({ detail: event }) => {
    console.log("Unichat event received:", event);
});
