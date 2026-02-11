import { createSingleItem } from "./single-item.js";

// Create Items Container
export function createItems(itemsArray, handlers) {
  const container = document.createElement("div");
  container.className = "items";

  if (itemsArray.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "empty-items";
    emptyMsg.textContent = "Your list is empty!";
    container.appendChild(emptyMsg);
    return container;
  }

  itemsArray.forEach((item) => {
    const itemElement = createSingleItem(item, handlers);
    container.appendChild(itemElement);
  });

  // add clear button
  const clearBtn = document.createElement("button");
  clearBtn.className = "clear-btn";
  clearBtn.textContent = "clear items";
  clearBtn.addEventListener("click", handlers.clearItems);
  container.appendChild(clearBtn);

  return container;
}

