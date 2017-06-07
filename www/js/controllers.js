angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CidadesCtrl', function($scope,$ionicModal,HttpService) {

$scope.filtro = '';

HttpService.getCidades()
   .then(function(response) {
       $scope.cidades = response;
    });


  $scope.est = {};
  $scope.cid = {};
  $scope.editcid = {};
  // Cadastro de Cidade
 
 //Selecionando o Estado
 $ionicModal.fromTemplateUrl('templates/cadastro/estado.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  //Editar Cidade
  $ionicModal.fromTemplateUrl('templates/cadastro/editCidade.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.editCidade = modal;
  });

  //Modal Estado
  $scope.openModal = function() {
    $scope.modal.show();
    HttpService.getEstados()
   .then(function(response) {
       $scope.estados = response;
    });
  };
  //Modal Editar Cidade
  $scope.openEdit = function(cidade) {
    console.log(cidade);
    $scope.editCidade.show();
    $scope.editcid.id = cidade.id_city;
    $scope.editcid.nome = cidade.name_city;
    $scope.editcid.estado = cidade.id_state;
  };
  //Close Estado
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Close Edicao
  $scope.closeEdit = function() {
    $scope.editCidade.hide();
  };
  $scope.selecionaEstado = function() {
      $scope.cid.estado = $scope.est.val;
      $scope.editcid.estado = $scope.est.val;
      $scope.closeModal();
  };

//atualiza a cidade
 $scope.consulta = function(){
    HttpService.getCidades()
   .then(function(response) {
       $scope.cidades = response;
    });
 }
//Insere a cidade
 $scope.insere = function(){
    HttpService.insereCidade($scope.cid)
   .then(function(response) {
       $scope.consulta();
    });
 }
//Delete a cidade
$scope.deleteItem = function(item){
  console.log(item);
  var resposta = confirm("Confirma a exclusão deste elemento?");
  if (resposta == true){
        HttpService.removeCidade(item)
        .then(function (response){
          $scope.consulta();
          $scope.showDelete = false;
        });
  }
}
//Editar Cidade
$scope.atualiza = function(){
    HttpService.atualizaCidade($scope.editcid)
    .then(function (response){
      $scope.consulta();
      $scope.closeEdit();
    });
 }



 })
.controller('CidadeCtrl', function($scope, $stateParams) {
})

.service('HttpService', function($http) {
 return {
   getCidades: function() {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.get('http://localhost:3000/cidades')
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Get Cidades', response);
         return response.data;
      });
   },
   getEstados: function() {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.get('http://localhost:3000/estados')
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Get Estados', response);
         return response.data;
      });
   },
   removeCidade: function(cid){
     return $http.delete('http://localhost:3000/remove/' + cid)
      .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Cidade removida', response);
         return response.data;
      }
      )
  },
    atualizaCidade: function(uga) {
     // $http returns a promise, which has a then function, which also returns a promise.
      return $http.put('http://localhost:3000/atualiza', uga)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Atualizou cidade', response.data);
         return response.data;
      });
   },
   insereCidade: function(cidades) {
    console.log(cidades);
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.post('http://localhost:3000/insere', cidades)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Inseriu a cidade', response);
         return response.data;
      });
   }
  };
});