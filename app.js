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
    localStorage["qc.students.points"] = JSON.stringify(qc.students.points);
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
        qc.selected_student.points++;
    };

    qc.getNext();
    
    // will do the first 5 completely fine then it goes off on random

}]);
