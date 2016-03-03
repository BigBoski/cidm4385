var myModule = angular.module("Quiz", []);

myModule.controller('quizController', ['$scope', 'studentListService','questionListService',
function($scope, studentListService, questionListService) {
    
    //refer to the controller's scope via a variable using 'this'
    var qc = this;
    
    //do we need any variables?
    qc.students_completed = [];
    

    qc.questions_completed = [];
    
    studentListService.getStudentList().then(function(response) {
        qc.students = response.people;
    });
    
    questionListService.getQuestion().then(function(response) {
        qc.questions = response.question;
    });
    
    
  // I tried figuring out the local storage bit and have not found any1 that could help or any help online.
  
   /* localStorage["qc.students"] = JSON.stringify(qc.students); // put qc.students array in local storage
    qc.ss = JSON.parse(localStorage["qc.students"]);// use qc.ss to access this storage
    

    localStorage["qc.questions"] = JSON.stringify(qc.questions);// same as students
    qc.qq = JSON.parse(localStorage["qc.questions"]);*/


    qc.nextquestion = function(){
        if(qc.questions.length > 0){
            var index = Math.floor(Math.random() * qc.questions.length); 
            qc.selected_question = qc.questions[index];
            qc.questions_completed.push(qc.selected_question);
            qc.questions.splice(index, 1);            
        }
        else{
            qc.questions = qc.questions_completed;
            qc.questions_completed = [];
        }
    };

    qc.nextstudent = function(){
        
        if(qc.students.length > 0){
            var index = Math.floor(Math.random() * qc.students.length);
            qc.selected_student = qc.students[index];
            qc.students_completed.push(qc.selected_student);
            qc.students.splice(index, 1);
            qc.selected_student.attempts++;
        }
        else{
            qc.students = qc.students_completed;
            qc.students_completed = [];
            
        }
    };
// use splice to take out student and question?
    qc.getNext = function(){
        //get a selected question
        qc.nextquestion();
        
        //get a selected student
         qc.nextstudent();
        
    };


    qc.answeredCorrectly = function(){
        qc.selected_student.points++;
    };
    
        qc.getStudents = function(){
        studentListService.getStudentList()
        .then(
            //what to do if $http.get was successful
            function(response){
                console.log(response.data);
                qc.students = response.data;
               // qc.getNext();
               qc.nextstudent();
            },
            //what to do if $http.get was unsuccessful            
            function(response){
                console.log(response);                
                qc.students = [];
            }
        );
    };
    qc.getQuestion = function(){
        questionListService.getQuestion()
        .then(
            //what to do if $http.get was successful
            function(response){
                console.log(response.data);
                qc.questions = response.data;
                qc.nextquestion();                
            },
            //what to do if $http.get was unsuccessful            
            function(response){
                console.log(response);                
                qc.questions = [];
            }
        );
    };
    
    //qc.getStudents();
    
   

}]);

myModule.factory('studentListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var studentListService = {};

    //get current rest conditions
    studentListService.getStudentList = function(){
        return $http.get("students.json").then(function(response){
            return response.data;
        });
    };
    
    return studentListService;
}]);

myModule.factory('questionListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var questionListService = {};

    //get current rest conditions
    questionListService.getQuestion = function(){
        return $http.get("questions.json").then(function(response){
            return response.data;
        }
        );
    };
    
    return questionListService;
}]);


myModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('my-storage', val);
            return this;
        },
        getData: function() {
            
            var val = $window.localStorage && $window.localStorage.getItem('my-storage');
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});


//var mc = this;
//mc.students [] //put ues array here
//mc.updat(angular.toJson(mc.studets))
//mc.students = localstorageservice.getdata();
//local sorage pat mc.student=localstorageservice.getdata()