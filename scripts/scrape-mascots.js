/* eslint-disable no-console */

// Run on https://emberjs.com/mascots/


function asJSONAPI() {
  let id = 0;
  let tags = new Map();
  let data = [...document.querySelectorAll('.tomster-wrapper')].map(wrapper => {
    return {
      type: 'mascots',
      id: id++,
      attributes: {
        title: wrapper.querySelector('.title').textContent.trim(),
        'image-url': wrapper.querySelector('img').src,
        'introduced-date': wrapper.querySelector('.date').textContent.trim()
      },
      relationships: {
        tags: {
          data: wrapper.dataset.tags.split(/ +/).map(tagName => {
            if (!tags.has(tagName)) {
              tags.set(tagName, {
                type: 'tags',
                id: tags.size,
                attributes: {
                  name: tagName
                }
              });
            }
            let tag = tags.get(tagName);
            return { id: tag.id, type: tag.type }
          })
        }
      }
    };
  });

  return { data, included: [...tags.values()] };
}

function dump(){
  console.log(JSON.stringify(asJSONAPI(), null, 2));
}

dump();
