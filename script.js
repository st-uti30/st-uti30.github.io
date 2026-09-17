/* =========================
   GET HTML ELEMENTS
========================= */

const windows =
    [...document.querySelectorAll(".window")];

const taskButtons =
    document.getElementById("taskButtons");

const toast =
    document.getElementById("toast");



/* =========================
   TOAST MESSAGE
========================= */

function showToast(text) {

    toast.textContent = text;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 1500);

}



/* =========================
   CREATE TASKBAR BUTTONS
========================= */

function addTaskButton(win) {

    if (
        document.querySelector(
            `[data-task="${win.id}"]`
        )
    ) {

        return;

    }


    const button =
        document.createElement("button");


    button.className =
        "task-btn";


    button.dataset.task =
        win.id;


    button.textContent =
        win.id + ".exe";


    button.onclick = () => {

        win.style.display = "block";

        win.classList.remove("minimized");

        win.querySelector(
            ".window-body"
        ).style.display = "block";

    };


    taskButtons.appendChild(button);

}


windows.forEach(addTaskButton);



/* =========================
   CLOSE WINDOWS
========================= */

document
    .querySelectorAll(".close")
    .forEach(button => {

        button.onclick = () => {

            const window =
                button.closest(".window");

            window.style.display = "none";

        };

    });



/* =========================
   MINIMIZE WINDOWS
========================= */

document
    .querySelectorAll(".min")
    .forEach(button => {

        button.onclick = () => {

            const window =
                button.closest(".window");

            const body =
                window.querySelector(
                    ".window-body"
                );


            if (
                body.style.display === "none"
            ) {

                body.style.display = "block";

                window.classList.remove(
                    "minimized"
                );

            }

            else {

                body.style.display = "none";

                window.classList.add(
                    "minimized"
                );

            }

        };

    });



/* =========================
   SIDEBAR NAVIGATION
========================= */

document
    .querySelectorAll("[data-window]")
    .forEach(button => {

        button.onclick = () => {

            const window =
                document.getElementById(
                    button.dataset.window
                );


            window.style.display =
                "block";


            window.classList.remove(
                "minimized"
            );


            window.querySelector(
                ".window-body"
            ).style.display =
                "block";


            window.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });


            document
                .querySelectorAll(".nav-item")
                .forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


            button.classList.add(
                "active"
            );

        };

    });



/* =========================
   HERO BUTTONS
========================= */

document
    .querySelectorAll(
        "[data-window-open]"
    )
    .forEach(button => {

        button.onclick = () => {

            const window =
                document.getElementById(
                    button.dataset.windowOpen
                );


            window.style.display =
                "block";


            window.classList.remove(
                "minimized"
            );


            window.querySelector(
                ".window-body"
            ).style.display =
                "block";


            window.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        };

    });



/* =========================
   DARK / LIGHT MODE
========================= */

document
    .getElementById("themeBtn")
    .onclick = () => {

        document.body.classList.toggle(
            "dark"
        );


        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            showToast("Dark mode");

        }

        else {

            showToast("Light mode");

        }

    };



/* =========================
   TYPING ANIMATION
========================= */

const phrases = [

    "CSE (AI & ML) student.",

    "Front-end learner.",

    "Creative problem solver.",

    "Always building something new."

];


let phraseIndex = 0;

let characterIndex = 0;

let deleting = false;



function typeText() {

    const element =
        document.getElementById(
            "typing"
        );


    const currentPhrase =
        phrases[phraseIndex];


    element.textContent =
        currentPhrase.slice(
            0,
            characterIndex
        );


    /* TYPE */

    if (
        !deleting &&
        characterIndex <
            currentPhrase.length
    ) {

        characterIndex++;

        setTimeout(
            typeText,
            65
        );

    }


    /* WAIT */

    else if (!deleting) {

        deleting = true;

        setTimeout(
            typeText,
            1000
        );

    }


    /* DELETE */

    else if (
        characterIndex > 0
    ) {

        characterIndex--;

        setTimeout(
            typeText,
            32
        );

    }


    /* NEXT PHRASE */

    else {

        deleting = false;

        phraseIndex =
            (phraseIndex + 1)
            % phrases.length;

        setTimeout(
            typeText,
            250
        );

    }

}


typeText();



/* =========================
   DIGITAL CLOCK
========================= */

function updateClock() {

    const now =
        new Date();


    document.getElementById(
        "clock"
    ).textContent =

        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


updateClock();


setInterval(
    updateClock,
    1000
);



/* =========================
   COPY EMAIL
========================= */

document
    .getElementById("copyEmail")
    .onclick = async () => {

        const email =
            document.getElementById(
                "email"
            ).textContent;


        try {

            await navigator.clipboard
                .writeText(email);

            showToast(
                "Email copied!"
            );

        }

        catch {

            showToast(
                "Copy failed"
            );

        }

    };



/* =========================
   START BUTTON
========================= */

document
    .getElementById("startBtn")
    .onclick = () => {

        showToast(
            "Welcome to STUTI_OS"
        );


        windows.forEach(window => {

            window.style.display =
                "block";

            window.querySelector(
                ".window-body"
            ).style.display =
                "block";

        });

    };
