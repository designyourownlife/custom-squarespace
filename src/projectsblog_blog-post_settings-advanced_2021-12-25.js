const teaserImg = () => {
  const headerImgElem = document.getElementsByClassName('sqs-block image-block sqs-block-image')[0].firstElementChild;
  console.log(headerImgElem);
  headerImgElem.classList.add('header-img');
}
  
const repositionBlogMeta = () => {
  const metaTopPos = document.querySelector('.blog-item-meta-wrapper');
  const oldParent = document.querySelector('.blog-meta-item.blog-meta-item--tags');
  if (metaTopPos && metaTopPos!=='') {
    let new_meta = document.createElement('div');
    new_meta.classList.add('blog-meta-item', 'blog-meta-item--tags');
    //metaTopPos.appendChild(new_meta);
    const newParent = metaTopPos.insertBefore(new_meta, metaTopPos.firstChild);
    while (oldParent.childNodes.length > 0) {
      newParent.appendChild(oldParent.childNodes[0])
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  teaserImg();
  repositionBlogMeta();
});