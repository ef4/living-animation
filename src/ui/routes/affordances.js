import Route from '@ember/routing/route';
import ENV from 'living-animation/config/environment';

export default Route.extend({
  model() {
    return [
      { id: 'steamboat', width: 287   },
      { id: 'gromit', width: 444      },
      { id: 'sully', width: 278       },
      { id: 'mario', width: 362       },
      { id: 'birds', width: 413       },
      { id: 'mobile', width: 333      },
      { id: 'login', width: 239       },
      { id: 'minecraft', width: 423   },
      { id: 'skyrim', width: 400      },
      { id: 'beachball', width: 247   },
      { id: 'genie', width: 400       },
      { id: 'docs-nav', width: 239    },
      { id: 'concurrency' , width: 360},
      { id: 'animoji', width: 333     },
    ].map(model => {
      // the above widths are correct for a height of 250px. Here we
      // scale them.
      model.width = model.width * 170 / 250;
      model.height = 170;
      model.url = `${ENV.rootURL}images/${model.id}.gif`;
      return model;
    });
  }
});
