import Route from '@ember/routing/route';
import ENV from 'living-animation/config/environment';

export default Route.extend({
  model() {
    return [
      { id: 'steamboat'       },
      { id: 'gromit'      },
      { id: 'sully'       },
      { id: 'mario'       },
      { id: 'birds'       },
      { id: 'mobile'      },
      { id: 'login'       },
      { id: 'minecraft'   },
      { id: 'skyrim'      },
      { id: 'beachball'   },
      { id: 'genie'       },
      { id: 'docs-nav'    },
      { id: 'concurrency' },
      { id: 'animoji'     },
    ].map(model => {
      model.url = `${ENV.rootURL}images/${model.id}.gif`;
      return model;
    });
  }
});
