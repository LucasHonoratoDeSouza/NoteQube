document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const addNodeButton = document.getElementById("add-node");
    const addLineButton = document.getElementById("add-line");
    const deleteNodeButton = document.getElementById("delete-node");
    const deleteLineButton = document.getElementById("delete-line");
    const saveButton = document.getElementById("save-button");
    let isDragging = false;
    let activeNode = null;
    let initialX;
    let initialY;
    let offsetX = 0;
    let offsetY = 0;
    let lineDrawing = false;
    let startPoint = null;
    let endPoint = null;

    const colors = ["#3498db", "#9b59b6", "#e91e63", "#41de66", "#de41de", "#ffa200","#fb5607", "#9bf6ff", "#f7fff7"];
    let colorIndex = 0;

    addNodeButton.addEventListener("click", addNode);
    addLineButton.addEventListener("click", toggleLineDrawing);
    deleteNodeButton.addEventListener("click", deleteNodes);
    deleteLineButton.addEventListener("click", deleteLines);
    saveButton.addEventListener("click", saveMap);

    function addNode() {
        const newNode = createNode();
        canvas.appendChild(newNode);
    }

    function createNode() {
        const node = document.createElement("div");
        node.className = "node textBox"; 
        node.style.left = "100px"; 
        node.style.top = "100px"; 

        node.addEventListener("mousedown", dragStart);
        node.addEventListener("mouseup", dragEnd);
        node.addEventListener("dblclick", editNodeText);
        node.addEventListener("click", changeBorderColor);

        return node;
    }

    function dragStart(e) {
        isDragging = true;
        activeNode = e.target;
        initialX = e.clientX - activeNode.offsetLeft;
        initialY = e.clientY - activeNode.offsetTop;
        canvas.addEventListener("mousemove", drag);
    }

    function dragEnd() {
        isDragging = false;
        activeNode = null;
        canvas.removeEventListener("mousemove", drag);
        drawLines();
    }

    function drag(e) {
        if (isDragging && activeNode) {
            e.preventDefault();
            const x = e.clientX - initialX;
            const y = e.clientY - initialY;
            activeNode.style.left = `${x}px`;
            activeNode.style.top = `${y}px`;
        }
    }

    function editNodeText(e) {
        const node = e.target;
        if (node.classList.contains('textBox')) { 
            const currentText = node.textContent.trim();
            const textarea = document.createElement('textarea');
            textarea.value = currentText;
            node.textContent = ''; 
            node.appendChild(textarea);
            textarea.focus();

            textarea.addEventListener('blur', function () {
                const newText = textarea.value.trim();
                node.removeChild(textarea);
                node.textContent = newText;
            });
        }
    }

    function changeBorderColor(e) {
        const node = e.target;
        node.style.borderColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }

    function toggleLineDrawing() {
        lineDrawing = !lineDrawing;
        if (lineDrawing) {
            canvas.addEventListener("mousedown", startLine);
            canvas.addEventListener("mouseup", endLine);
            addLineButton.disabled = true; 
        } else {
            canvas.removeEventListener("mousedown", startLine);
            canvas.removeEventListener("mouseup", endLine);
            addLineButton.disabled = false; 
        }
    }

    function startLine(e) {
        startPoint = { x: e.clientX, y: e.clientY };
        canvas.addEventListener("mousemove", drawTempLine);
    }

    function drawTempLine(e) {
        if (startPoint) {
            if (canvas.lastChild.classList.contains("line-temp")) {
                canvas.removeChild(canvas.lastChild);
            }
            const tempLine = createLine(startPoint.x, startPoint.y, e.clientX, e.clientY, true);
            canvas.appendChild(tempLine);
        }
    }

    function endLine(e) {
        endPoint = { x: e.clientX, y: e.clientY };
        if (startPoint && endPoint) {
            const line = createLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, false);
            canvas.appendChild(line);
            startPoint = null;
            endPoint = null;
            toggleLineDrawing();
        }
        canvas.removeEventListener("mousemove", drawTempLine);
    }

    function createLine(x1, y1, x2, y2, isTemp) {
        const line = document.createElement("div");
        line.className = isTemp ? "line line-temp" : "line";
        line.style.left = x1 + "px";
        line.style.top = y1 + "px";
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        line.style.width = length + "px";
        line.style.transformOrigin = "top left";
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
        line.style.transform = "rotate(" + angle + "deg)";
        return line;
    }

    function drawLines() {
        const activeNode = document.querySelector('.node.dragging');
        if (!activeNode) return;
        const lines = document.querySelectorAll(".line:not(.line-temp)");
        for (let line of lines) {
            canvas.removeChild(line);
        }
        const nodes = document.getElementsByClassName("node");
        for (let node of nodes) {
            if (node !== activeNode) {
                const rect1 = activeNode.getBoundingClientRect();
                const rect2 = node.getBoundingClientRect();
                const x1 = rect1.left + rect1.width / 2;
                const y1 = rect1.top + rect1.height / 2;
                const x2 = rect2.left + rect2.width / 2;
                const y2 = rect2.top + rect2.height / 2;
                const line = createLine(x1, y1, x2, y2, false);
                canvas.appendChild(line);
            }
        }
    }

    function deleteNodes() {
        const nodes = document.querySelectorAll(".node");
        for (let node of nodes) {
            canvas.removeChild(node);
        }
        activeNode = null;
        drawLines();
    }

    function deleteLines() {
        const lines = document.querySelectorAll(".line");
        for (let line of lines) {
            canvas.removeChild(line);
        }
    }

    function saveMap() {
        const canvasElement = document.getElementById("canvas");

        const imgData = canvasElement.toDataURL("image/png");

        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'mapa_mental.png';
        link.click();
    }

});

document.getElementById('saveCanvas').addEventListener('click', () => {
    const content = document.getElementById('canvas');
    


    html2canvas(document.getElementById("canvas"), {
        backgroundColor: "#262f34", 
    }).then(function(canvas) {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'myMindMap-NoteQube.png';
        link.click();
    });
  
});
