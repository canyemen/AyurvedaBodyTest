// A personality quiz

// This is an array of objects that stores the personality trait that is prompted to the user and the weight for each prompt. 
// If a personality trait is considered more introverted, it will have a negative weight.
// If a personlity trait is considered more extroverted, it will have a positive weight.

var prompts = [
    {
        prompt: 'What is your body type: 1.SLIM  2.MEDIUM  3.LARGE',
        weight: 0,
        class: 'group0'
    },
    {
        prompt: 'How is your body weight: 1.LOW  2.MEDIUM  3.OVERWEIGHT',
        weight: 0,
        class: 'group0'
    },
    {
        prompt: 'What is your chin type: 1.THIN,ANGULAR  2.TAPERING  3.ROUNDED OR DOUBLE',
        weight: 0,
        class: 'group2'
    },
    {
        prompt: 'How your checks feel: 1.WRINKLED,SUNKEN  2.SMOOTH FLAT  3.ROUNDED, PLUMP',
        weight: 0,
        class: 'group3'
    },
    {
        prompt: 'How your eyes seems: 1.SMALL, DRY, BLACK, ACTIVE  2.SHARP BRIGHT GREEN SENSITIVE TO LIGHT 3.BIG BEAUTIFUL BLUE CALM LOVING',
        weight: 0,
        class: 'group4'
    },
    {
        prompt: 'What is your skin type: 1.THIN DRY COLD ROUGH DRY 2.SMOOTH WARM OILY ROSY 3.THICK OIL WHITE PALE',
        weight: 0,
        class: 'group5'
    },
    {
        prompt: 'Your hair type: 1.DRY BROWN BLACK KNOTTED BRITTLE  SCARCE 2.STRAIGHT OILY BLOND GRAY RED 3.THICK OILY CURLY WAVY LUXURIANT',
        weight: 0,
        class: 'group6'
    },
    {
        prompt: 'How your neck seems: 1.THICK TALL 2.MEDIUM 3.BIG FOLDED',
        weight: 0,
        class: 'group7'
    },
    {
        prompt: 'How your belly seems:1.THIN FLAT SUNKEN 2.MODERATE 3.BIG POT-BELLIED',
        weight: 0,
        class: 'group8'
    },
    {
        prompt: 'How your appetite feels: 1.IRREGULAR, SCANTY 2.STRONG UNBEARABLE 3.SLOW BUT STEADY',
        weight: 0,
        class: 'group9'
    },
    {
        prompt: 'How your taste seems to you: 1. SWEET SOUR SALTY 2.SWEET BITTER ASTRINGENT 3.BITTER PUNGENT ASTRINGENT',
        weight: 0,
        class: 'group00'
    },
    {
        prompt: 'You are physicaly: 1.HYPERACTIVE 2.MODERATE 3.SLOW',
        weight: 0,
        class: 'group00'
    }
    
    ]
    
    // This array stores all of the possible values and the weight associated with the value. 
    // The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
    var prompt_values = [
    {
        value: '1', 
        class: 'btn-default btn-strongly-agree',
        weight: -1
    },
    
    {
        value: '2', 
        class: 'btn-default',
        weight: 1
    },
   
    { 
        value: '3',
        class: 'btn-default btn-strongly-disagree',
        weight: 1.1
    }
    ]
    
    // For each prompt, create a list item to be inserted in the list group
    function createPromptItems() {
    
        for (var i = 0; i < prompts.length; i++) {
            var prompt_li = document.createElement('li');
            var prompt_p = document.createElement('p');
            var prompt_text = document.createTextNode(prompts[i].prompt);
    
            prompt_li.setAttribute('class', 'list-group-item prompt');
            prompt_p.appendChild(prompt_text);
            prompt_li.appendChild(prompt_p);
    
            document.getElementById('quiz').appendChild(prompt_li);
        }
    }
    
    // For each possible value, create a button for each to be inserted into each li of the quiz
    // function createValueButtons() {
        
    // 	for (var li_index = 0; li_index < prompts.length; li_index++) {
    // 		for (var i = 0; i < prompt_values.length; i++) {
    // 			var val_button = document.createElement('button');
    // 			var val_text = document.createTextNode(prompt_values[i].value);
    
    // 			val_button.setAttribute('class', 'value-btn btn ' + prompt_values[i].class);
    // 			val_button.appendChild(val_text);
    
    // 			document.getElementsByClassName('prompt')[li_index].appendChild(val_button);
    // 		}
    // 	}
    // }
    function createValueButtons() {
        for (var li_index = 0; li_index < prompts.length; li_index++) {
            var group = document.createElement('div');
            group.className = 'btn-group btn-group-justified';
    
            for (var i = 0; i < prompt_values.length; i++) {
                var btn_group = document.createElement('div');
                btn_group.className = 'btn-group';
    
                var button = document.createElement('button');
                var button_text = document.createTextNode(prompt_values[i].value);
                button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
                button.appendChild(button_text);
    
                btn_group.appendChild(button);
                group.appendChild(btn_group);
    
                document.getElementsByClassName('prompt')[li_index].appendChild(group);
            }
        }
    }
    
    createPromptItems();
    createValueButtons();
    
    // Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
    // Calculation will sum all of the answers to the prompts using weight of the value + the weight of the prompt.
    var total = 0;
    
    // Get the weight associated to group number
    function findPromptWeight(prompts, group) {
        var weight = 0;
    
        for (var i = 0; i < prompts.length; i++) {
            if (prompts[i].class === group) {
                weight = prompts[i].weight;
            }
        }
    
        return weight;
    }
    
    // Get the weight associated to the value
    function findValueWeight(prompt_values, value) {
        var weight = 0;
    
        for (var i = 0; i < prompt_values.length; i++) {
            if (prompt_values[i].value === value) {
                weight =prompt_values[i].weight;
            }
        }
    
        return weight;
    }
    
    // When user clicks a value to agree/disagree with the prompt, display to the user what they selected
    $('.value-btn').mousedown(function () {
        var classList = $(this).attr('class');
        // console.log(classList);
        var classArr = classList.split(" ");
        // console.log(classArr);
        var this_group = classArr[0];
        // console.log(this_group);
    
        // If button is already selected, de-select it when clicked and subtract any previously added values to the total
        // Otherwise, de-select any selected buttons in group and select the one just clicked
        // And subtract deselected weighted value and add the newly selected weighted value to the total
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            total -= (findPromptWeight(prompts, this_group) + findValueWeight(prompt_values, $(this).text()));
        } else {
            // $('[class='thisgroup).prop('checked', false);
            total -= (findPromptWeight(prompts, this_group) + findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
            // console.log($('.'+this_group+'.active').text());
            $('.'+this_group).removeClass('active');
    
            // console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
            // $(this).prop('checked', true);
            $(this).addClass('active');
            total += (findPromptWeight(prompts, this_group) + findValueWeight(prompt_values, $(this).text()));
        }
    
        console.log(total);
    })
    
    
    
    $('#submit-btn').click(function () {
        // After clicking submit, add up the totals from answers
        // For each group, find the value that is active
        $('.results').removeClass('hide');
        $('.results').addClass('show');
        
        if(total < 2) {
            // document.getElementById('intro-bar').style.width = ((total / 60) + 000) + '%';
            // console.log(document.getElementById('intro-bar').style.width);
            // document.getElementById('intro-bar').innerHTML= ((total / 60) + 000) + '%';
            document.getElementById('results').innerHTML = '<b>Your body nature is VATA!</b>';
        } else if(total>=2 && total<=9) {
            document.getElementById('results').innerHTML = '<b>Your body nature is PITTA!</b>';
        } else {
            document.getElementById('results').innerHTML = '<b>Your body nature is KAPHA!</b>';
        }
    
        // Hide the quiz after they submit their results
        $('#quiz').addClass('hide');
        $('#submit-btn').addClass('hide');
        $('#retake-btn').removeClass('hide');
    })
    
    // Refresh the screen to show a new quiz if they click the retake quiz button
    $('#retake-btn').click(function () {
        $('#quiz').removeClass('hide');
        $('#submit-btn').removeClass('hide');
        $('#retake-btn').addClass('hide');
    
        $('.results').addClass('hide');
        $('.results').removeClass('show');
    })