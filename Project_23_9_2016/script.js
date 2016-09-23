var myapp = angular.module("Myapp",['ngRoute']);
		myapp.config(function($routeProvider){
		
			$routeProvider
			.when("/book_list",{
				templateUrl:"main.html",
				controller:"library"	
			})
			.when("/new_book",{
				templateUrl:"new_book.html",
				controller:"book_controller"		
			})
			.when("/new_author",{
				templateUrl:"new_author.html",
				controller:"author_controller"	
			})
		});
		
		myapp.controller('index_controller',['$rootScope','$scope','$http',function($rootScope,$scope,$http){
			$rootScope.hide_corousel = false;
		}])
		
		myapp.controller('library',['$rootScope','$scope','$http',function($rootScope,$scope,$http){
			$rootScope.hide_corousel = true;
			
			$http({
				method: 'GET',
				url: 'http://172.27.12.104:3000/book/list'
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.names = response.data;
			}, function errorCallback(response) {
   
			});

			$http({
				method: 'GET',
				url: 'http://172.27.12.104:3000/author/list'
			}).then(function successCallback(response) {
				console.log(response.data);
			}, function errorCallback(response) {
   
			});		
		}]);
		
		myapp.filter('urlencode', function() {
			return function(input) {
				//console.log(input);	
				return window.encodeURIComponent(input);
				
			}
		});
		
		myapp.controller('author_controller',['$location','$scope','$http','$rootScope',function($location,$scope,$http,$rootScope){
			$scope.add_success_message = false;
			$scope.update_success_message = false;
			$scope.delete_success_message = false;	
			
			//console.log($location.search());
			$scope.dept = "Engineering";
			$scope.website = null;
			var author_name = $location.search();
			
			//Identify whether add view or edit view
			if(author_name.name==undefined){
				$scope.add_view=1;
				$scope.edit_view=0;
				console.log(author_name.name);
			}
			else{
				$scope.edit_view=1;
				$scope.add_view=0;
				console.log(author_name.name);
			}
			$rootScope.hide_corousel = true;
			//Getting author by name and displaying the details
			$http({
				method: 'POST',
				url: 'http://172.27.12.104:3000/author/byname',
				data:{
					name:author_name.name
				}
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.newAuthor = response.data;
			}, function errorCallback(response) {
				console.log(response.data);
			});	
			
			$scope.skills=['Node.js','Python','Java','Javascript','HTML'];
			$scope.folder = {
				"Node.js" : false,
				"Python" : false,
				"Java" : false,
				"Javascript" : false,
				"HTML" : false
			};
			
			//Save function of adding new author
			$scope.func_save=function(){
				var skill_arr=[];
				angular.forEach($scope.folder,function(key,value){
					if(key)
						skill_arr.push(value)
				});
	
				$http({
					method: 'POST',
					url: 'http://172.27.12.104:3000/author/new',
					data:{
						"name": $scope.emp_name,
						"empid": $scope.empid,
						"email": $scope.email,
						"skills": skill_arr,
						"department": $scope.dept,
						"website": $scope.website	
					},
					
				}).then(function successCallback(response) {
					console.log(response.data);
					$scope.add_success_message = true;
				}, function errorCallback(response) {
					console.log(response.data);
				});	
			}
			
			//display input boxes on clicking edit
			$scope.edit_clicked=1;
			$scope.func_edit=function(cur_skills){
				$scope.edit_clicked =0;
				
				for(i=0;i<cur_skills.length;i++){
					console.log(cur_skills[i]);
					$scope.folder[curr_skills[i]]=true;
				}
				console.log($scope.folder);
			}

			//Save function of editing existing author	
			$scope.func_edit_save=function(cur_author){
				var skill_arr=[];
				angular.forEach($scope.folder,function(key,value){
					if(key)
						skill_arr.push(value)
				});	
				//console.log(skill_arr);
					
				$http({
					method: 'PUT',
					url: 'http://172.27.12.104:3000/author/update',
					data:{
						"name": cur_author.name,
						"empid": cur_author.empid,
						"email": cur_author.email,
						"skills": skill_arr,
						"department": cur_author.dept,
						"website": cur_author.website	
					}	
				}).then(function successCallback(response) {
					console.log(response.data);
					$scope.update_success_message = true;
				}, function errorCallback(response) {
					console.log(response.data);
				});
			}
			
			//Deleting the current author
			$scope.func_delete=function(value){
				console.log(typeof(value.empid));
				//console.log($scope.newAuthor.empid);
				$http({
					method: 'DELETE',
					url: 'http://172.27.12.104:3000/author/remove',
					data:$.param({
						"empid":value.empid
					}),
					headers :{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(function successCallback(response) {
					console.log(response.data);
					$scope.delete_success_message = true;
				}, function errorCallback(response) {
					console.log(response.data);
				});	
			}
		}])
		
		myapp.controller('book_controller',['$location','$scope','$http','$rootScope',function($location,$scope,$http,$rootScope){
			
			$scope.add_success_message = false;
			$scope.update_success_message = false;
			$scope.delete_success_message = false;	
			
			var book_isbn = $location.search();
			
			if(book_isbn.name==undefined){
				$scope.add_view=1;
				$scope.edit_view=0;
				console.log(book_isbn.name);
			}
			else{
				$scope.edit_view=1;
				$scope.add_view=0;
				console.log(book_isbn.name);
			}
			
			$rootScope.hide_corousel = true;
			
			$scope.sites=['Flipkart','Amazon','Snapdeal','Myntra','Ebay'];
			$scope.folder={
				Flipkart:false,
				Amazon:false,
				Snapdeal:false,
				Myntra:false,
				Ebay:false	
			};
			
			$scope.edit_clicked=1;
			$scope.func_edit=function(curr_sites){
				$scope.edit_clicked =0;
				
				for(i=0;i<curr_sites.length;i++){
					console.log(curr_sites[i]);
					$scope.folder[curr_sites[i]]=true;
				}
				console.log($scope.folder);
			}
			
			//Getting book by isbn and displaying the details
			$http({
				method: 'Post',
				url: 'http://172.27.12.104:3000/book/byisbn',
				data:{
					isbn:book_isbn.name
				}
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.newBook = response.data;
			}, function errorCallback(response) {
				console.log(response.data);
			});	
			
			//Save function of adding new book
			$scope.func_save=function(){
				
				var site_arr=[];
				angular.forEach($scope.folder,function(key,value){
					if(key)
						site_arr.push(value)
				});
				
				$http({
					method: 'POST',
					url: 'http://172.27.12.104:3000/book/new',
					data:{
						"isbn": $scope.isbn,
						"title": $scope.title,
						"author": $scope.author,
						"price": $scope.price,
						"availableOn": site_arr	
					},
					
				}).then(function successCallback(response) {
					console.log(response.data);
					$scope.add_success_message = true;
				}, function errorCallback(response) {
					console.log(response.data);
				});
			}

			//Save function of editing existing book	
			$scope.func_edit_save=function(cur_book){
				var site_arr=[];
				angular.forEach($scope.folder,function(key,value){
					if(key)
						site_arr.push(value)
				});
				console.log(cur_book);
				$http({
					method: 'PUT',
					url: 'http://172.27.12.104:3000/book/update',
					data:{
						"isbn": cur_book.isbn,
						"title": cur_book.title,
						"author": cur_book.author,
						"price": cur_book.price,
						"availableOn": site_arr		
					}	
				}).then(function successCallback(response) {
					console.log(response.data);
					$scope.update_success_message = true;
				}, function errorCallback(response) {
					console.log(response.data);
				});		
			}

			//Deleting the current book
			$scope.func_delete=function(value){
			
				$http({
					method: 'Delete',
					url: 'http://172.27.12.104:3000/book/remove',
					data:$.param({
						"isbn":value
					}),
					headers :{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(function successCallback(response) {
					console.log(response.data);
					$scope.delete_success_message = true;
				}, function errorCallback(response) {
					console.log(response.data);
				});	
			}
		}]);