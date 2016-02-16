var myModule = angular.module("Quiz", []);

myModule.controller('quizController', ['$scope', function($scope) {
    
    //refer to the controller's scope via a variable using 'this'
    var qc = this;
    
    //do we need any variables?
    
    //students array
    qc.students = 
    [
        {
            person: "john",
            points: 0,
            attempts: 0
        },
        {
            person: "bo",
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
            text: "How flavors are in Dr. Pepper",
            answer: "23"
        }        
    ];

    qc.getNext = function(){
        //get a selected question
        qc.getRandomQuestion();
        
        //get a selected student
        qc.getRandomStudent();          
        
    }

    qc.getRandomStudent = function(){
        qc.selected_random_number = Math.floor(Math.random() * 5);
        qc.selected_student = qc.students[qc.selected_random_number]; 
        qc.selected_student.attempts++;
    };
    
    qc.getRandomQuestion = function(){
        qc.selected_random_number = Math.floor(Math.random() * 5);
        qc.selected_question = qc.questions[qc.selected_random_number];
    }
    
    qc.answeredCorrectly = function(){
        qc.selected_student.points++;   
    }

    
    //get a selected question
    qc.getRandomQuestion();
    
    //get a selected student
    qc.getRandomStudent();    
    

}]);


/*
function Name() {
    var myarray = new Array("s1", "s2", "s3");
    var random = myarray[Math.floor(Math.random() * myarray.length)];
    document.getElementById("message").innerHTML = random;
}

myModule.controller('points',
    function($scope) {
        var p = this;
        p.total = 0.0;

        function update() {

            p.total += p.correct;
        }

        $scope.$watch('p.correct', update);

        p.point_options[{
                point: 1.0,
                name: "correct"
            }, {
                point: 0.0,
                name: "wrong"
            }

        ];
        p.correct = p.point_options[0];

    }

);

myModule.controller('Questions',
    function($scope) {
        var q = this;

        q.question_options = [{
            name: "q1"
        }, {
            name: "q2"
        }, {
            name: "q3"
        }];

        q.question = q.question_options[0];
    }
    
);
*/