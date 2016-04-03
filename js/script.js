var mainPage = [
    {
      h1: 'The Beatles: найвідоміший гурт в історії людства',
      rubric: 'музика',
      quastions: '7 запитань',
      image: 'img/item_music.jpg',
      url: 'simple-test_Beatles.html',
      type: 'glyphicon glyphicon-check'
    },
    {
      h1: 'Художня література XX століття',
      rubric: 'література',
      quastions: '5 запитань',
      image: 'img/item_literature.jpg',
      url: 'wheel-of-fortune_LiteratureXX.html',
      type: 'glyphicon glyphicon-stop'
    },
    {
      h1: 'Столиці світу',
      rubric: 'географія',
      quastions: '6 запитань',
      image: 'img/item_capitals.jpg',
      url: 'map-test_capital.html',
      type: 'glyphicon glyphicon-screenshot'
    },
    'temp1',
    'temp2',
    'temp3',
    'temp4',
    'temp5'
  ];

angular.module('myApp', []).controller('namesCtrl', function($scope) {
  $scope.names = mainPage;
});