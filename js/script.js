document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll('.container');
    const innerSquares = document.querySelectorAll('.inner-square');
    const closeButton = document.getElementById('closeButton');
    const copySound = new Audio ('./sound/src_notify.mp3')
    let isContainerOpen = false;

    containers.forEach(container => {
        container.addEventListener('click', function () {
            const square = this.querySelector('.square');

            if (square) {
                if (!isContainerOpen) {
                    square.style.width = '100vw';
                    square.style.height = '100vh';
                    square.style.margin = '0';
                    square.style.position = 'fixed';
                    square.style.top = '50%';
                    square.style.left = '50%';
                    square.style.transform = `translate(-50%, -50%)`;

                    document.body.style.overflow = 'hidden';
                    const title = this.querySelector('.text-bottom');
                    if (title) {
                        title.style.top = '5%';
                        title.style.fontSize = '24px';
                    }

                    isContainerOpen = true;
                }
            }
        });
    });

    innerSquares.forEach(innerSquare => {
        innerSquare.addEventListener('click', function () {
            if (isContainerOpen) {
                const colorCode = this.style.backgroundColor;
                copyToClipboard(colorCode);

                setTimeout(() => {
                    containers.forEach(container => {
                        const square = container.querySelector('.square');
                        if (square) {
                            square.style.visibility = 'hidden';
                        }

                        const title = container.querySelector('.text-bottom');
                        if (title) {
                            title.style.top = '50%';
                            title.style.fontSize = '18px';
                        }
                    });

                    containers.forEach(container => {
                        const square = container.querySelector('.square');
                        if (square) {
                            square.style.visibility = 'visible';
                        }
                    });

                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });

    closeButton.addEventListener('click', function () {
        document.body.style.overflow = 'auto';
        isContainerOpen = false;
    });

    containers.forEach(container => {
        const title = container.querySelector('.text-bottom');
        if (title) {
            title.addEventListener('click', function () {
                document.body.style.overflow = 'auto';

                containers.forEach(container => {
                    const square = container.querySelector('.square');
                    if (square) {
                        square.style.visibility = 'visible';
                    }

                    const title = container.querySelector('.text-bottom');
                    if (title) {
                        title.style.top = '50%';
                        title.style.fontSize = '18px';
                    }
                });

                isContainerOpen = false;
            });
        }
    });

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copySound.play();
        alert('Color code copied to clipboard: ' + text);
    }
});
