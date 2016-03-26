angular.module('myApp', []).controller('namesCtrl', function($scope) {
  $scope.names = [
    {
      h1: 'The Beatles: найвідоміший гурт в історії людства',
      rubric: 'музика',
      quastions: '7 запитань',
      image: 'img/item_music.jpg',
      url: 'simple-test.html',
      type: 'glyphicon glyphicon-check',
    },
    {
      h1: 'Художня література XX століття',
      rubric: 'література',
      quastions: '5 запитань',
      image: 'img/item_literature.jpg',
      url: 'wheel-of-fortune.html',
      type: 'glyphicon glyphicon-stop'
    },
    'temp1',
    'temp2',
    'temp3',
    'temp4',
    'temp5',
    'temp6',
    'temp7'
  ];
});