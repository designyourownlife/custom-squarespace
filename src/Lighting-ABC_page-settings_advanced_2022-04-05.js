const createIndexHeader = (liElem, initialChar) => {
  let h4 = document.createElement("h4");
  h4.classList.add("archive-group-name-header", "abc-header");
  h4.textContent = initialChar;
  liElem.insertBefore(h4, liElem.firstChild);
};
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
const createListElement = (root, liContent) => {
  let li = document.createElement("li");
  li.classList.add("archive-group", "abc-item");
  li.innerHTML = liContent;
  return li;
};

const generateABCLinkList = (data, root) => {
  removeAllChildNodes(root);
  const new_ul = document.createElement("ul");
  new_ul.classList.add("archive-group-list", "abc-container");
  const list_root = root.appendChild(new_ul);
  data.forEach(function (entry) {
    let li = document.createElement("li");
    li.classList.add("archive-group", "abc-item");
    entry.htmlContent.forEach((anchor) => {
      let div = document.createElement("div");
      div.classList.add("archive-group-name-item");
      div.appendChild(anchor);
      li.appendChild(div);
    });
    createIndexHeader(li, entry.initialChar);
    list_root.appendChild(li);
  });
};

const getLinksForInitial = (data, initial) => {
  return data.reduce(function (newArr, elem) {
    if (elem.initialChar === initial) {
      newArr.push(...elem.htmlContent);
    }
    return newArr;
  }, []);
};

const sortNodeList = (list) =>
  list.sort((a, b) => (a.innerText > b.innerText ? 1 : -1));

const uniqueArray = (arr) => [...new Set(arr)];

window.customLazySummaries = {
  general: {
    allItemsAddedFunction: function (sum_block, jsonData) {
      let _initialCharsArray = [];

      const _abc_root = document.querySelector(
        "#block-yui_3_17_2_1_1649146760604_2755 .summary-item-list-container .summary-item-list"
      );

      const allItems = _abc_root.querySelectorAll(".summary-item");

      const _abcIndexData = [...allItems].map((item) => {
        const _initialChar = item
          .querySelector(".summary-metadata .summary-metadata-item a")
          .innerText.trim();
        const _entryLink = item.querySelector(".summary-title").children;
        const searchText = '%%placeholder%%'
        if( _entryLink[0].innerText.toLowerCase().indexOf(searchText) > -1 ) {
          _entryLink[0].parentNode.innerHTML = "<span>&nbsp;</span>";
        }
        _initialCharsArray.push(_initialChar);
        return { initialChar: _initialChar, htmlContent: _entryLink };
      });

      _initialCharsArray = uniqueArray(_initialCharsArray).sort();

      const _newDOM = _initialCharsArray.map((char) => {
        const _linkArray = sortNodeList(
          getLinksForInitial(_abcIndexData, char)
        );
        return { initialChar: char, htmlContent: _linkArray };
      });

      generateABCLinkList(_newDOM, _abc_root);
      // fade in result
      _abc_root.style.opacity = '1';
      _abc_root.style.filter = 'alpha(opacity=100)';
    },
  },
};
