// ตัวแปรและอ็อบเจ็กต์ที่ใช้ในการจัดการกับเหตุการณ์ลากและวาง
const stackContainer = document.getElementById("stack-container");
const block1 = document.querySelector(".block1");
const block2 = document.querySelector(".block2");
const maxStackSize = 6; 
const statusMessage = document.getElementById("status-message");
const countMessage = document.getElementById("count-message");
const positionMessage = document.getElementById("position-message");

// เพิ่ม Event Listener สำหรับกำหนดข้อมูลที่จะถูกลาก (dragstart)
block1.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "block1");
});

block2.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "block2");
});

// เพิ่ม Event Listener สำหรับกำหนดเหตุการณ์ที่เกิดขึ้นเมื่อมีการวาง (drop) บล็อกใน stack
stackContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});

stackContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");

  // Check if the stack is not full before adding a new block
  if (stackContainer.childElementCount < maxStackSize) {
    if (data === "block1") {
      const newBlock = block1.cloneNode(true);
      stackContainer.appendChild(newBlock);
    } else if (data === "block2") {
      const newBlock = block2.cloneNode(true);
      stackContainer.appendChild(newBlock);
    }
  }

  // เรียกใช้ฟังก์ชันอัปเดตสถานะ
  updateStatus();
});

// เพิ่ม Event Listener สำหรับเมื่อมีการดับเบิลคลิก (dblclick) บนบล็อกใน stack
stackContainer.addEventListener("dblclick", (e) => {
  if (
    e.target.classList.contains("block1") ||
    e.target.classList.contains("block2")
  ) {
    stackContainer.removeChild(e.target);
    // เรียกใช้ฟังก์ชันอัปเดตสถานะ
    updateStatus();
  }
});

// ฟังก์ชันเพื่อรับขนาดของ stack ปัจจุบัน
function getStackSize() {
  return stackContainer.childElementCount;
}

// ฟังก์ชันอัปเดตสถานะ (count และ message) ขึ้นอยู่กับขนาดของ stack
function updateStatus() {
  const currentStackSize = getStackSize();
  countMessage.textContent = `Count: ${currentStackSize}`;

  if (currentStackSize === 0) {
    statusMessage.textContent = "Stack is empty.";
    positionMessage.textContent = ""; // เคลียร์ข้อความตำแหน่งเมื่อ stack ว่าง
  } else if (currentStackSize === maxStackSize) {
    statusMessage.textContent = "Stack is full.";
    positionMessage.textContent += `${blockType}(${i + 1}) `;
  } else {
    // แสดงตำแหน่งของแต่ละบล็อกใน stack
    positionMessage.textContent = "Positions: ";
    const stackChildren = stackContainer.children;
    for (let i = 0; i < stackChildren.length; i++) {
      const blockType = stackChildren[i].classList.contains("block1")
        ? "block1"
        : "block2";
      positionMessage.textContent += `${blockType}(${i + 1}) `;
    } 
  }
}

// อัปเดตสถานะเริ่มต้น
updateStatus();
