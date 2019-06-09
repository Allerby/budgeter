import Route from '@ember/routing/route';

export default class PlaygroundRoute extends Route.extend() {
  model() {
    return [
      {
        title: 'foo',
        image: 'img-welcome-2@3x.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
        tags: ['foo', 'bar', 'bar']
      },
      {
        title: 'bar',
        image: 'img-welcome-1@3x.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
        tags: ['foo', 'bar', 'bar']
      },
      {
        title: 'baz',
        image: 'img-welcome-3@3x.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
        tags: ['foo', 'bar', 'bar']
      }
    ];
  }
}
