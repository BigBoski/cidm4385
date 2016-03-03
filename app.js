var myModule = angular.module("Quiz", []);

myModule.controller('quizController', ['$scope', function($scope) {
    
    //refer to the controller's scope via a variable using 'this'
    var qc = this;
    
    //do we need any variables?
    var answers=[];
    
    //students array
    qc.students = 
    [
        {
            person: "john",
            points: 0,
            attempts: 0,
            
        },
        {
            person: "Bo",
            points: 0,
            attempts: 0            
        },
        {
            person: "Mary",
            points: 0,
            attempts: 0            
        },
        {
            person: "Brandie",
            points: 0,
            attempts: 0            
        },
        {
            person: "Jeff",
            points: 0,
            attempts: 0            
        }        
    ];    
    localStorage["qc.students"] = JSON.stringify(qc.students); // put qc.students array in local storage
    qc.ss = JSON.parse(localStorage["qc.students"]);// use qc.ss to access this storage
    qc.students_completed = [];

    //questions array
    qc.questions =
    [
        {
            text: "What color is blue?",
            answer: "Blue"
        },
        {
            text: "What is 1 + 2?",
            answer: "3"
        },
        {
            text: "What is 4/2?",
            answer: "2"
        },
        {
           text: "What is the capitol of Texas?",
            answer: "Austin, TX"
        },
        {
            text: "How many flavors are in Dr. Pepper",
            answer: "23"
        }        
    ];
qc.questions_completed = [];

localStorage["qc.questions"] = JSON.stringify(qc.questions);// same as students
qc.qq = JSON.parse(localStorage["qc.questions"]);


    qc.nextquestion = function(){
        if(qc.qq.length > 0){
            var index = Math.floor(Math.random() * qc.qq.length); 
            qc.selected_question = qc.qq[index];
            qc.questions_completed.push(qc.selected_question);
            qc.questions.splice(index, 1);            
        }
        else{
            qc.qq = qc.questions_completed;
            qc.questions_completed = [];
        }
};

    qc.nextstudent = function(){
        
        if(qc.ss.length > 0){
            var index = Math.floor(Math.random() * qc.ss.length);
             
            qc.selected_student = qc.ss[index];
             
            qc.students_completed.push(qc.selected_student);
             
            qc.students.splice(index, 1);
            qc.selected_student.attempts++;
        }
        else{
            qc.ss = qc.students_completed;
            qc.students_completed = [];
            qc.selected_student.attempts++;
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
        qc.nextquestion();
        qc.nextstudent();
        qc.ss.points++;
    };

    qc.getNext();
    
    // will do the first 5 completely fine then it goes off on random

}]);

