var ideas
var lemons = 50
var max_lemons_images = 5

var current_page = 0

var ideas_evaluated = 0
var lemons_used = 0

var ideas_count
var lemons_count


window.onload = () => 
{
    var ideasContent = document.getElementById("ideas-content")
    var ideasElements = ideasContent.getElementsByClassName("idea")
    ideas = ideasElements.length
    ideas_count = document.getElementById("ideas_count")
    lemons_count = document.getElementById("lemons_count")
    
    SetIdeasCount()
    SetLemonsCount()
}


function SetIdeasCount()
{
    ideas_count.innerHTML = ideas_evaluated + '/' + ideas
}

function SetLemonsCount()
{
    lemons_count.innerHTML = (lemons - lemons_used) + '/' + lemons
}

function IncrementIdeasCount(amount)
{
    if(ideas_evaluated + amount >= ideas)
    {
        ideas_evaluated = ideas
    }
    else
    {
        ideas_evaluated += amount
    }

    SetIdeasCount()
}

function AddLemon(idea_lemons_count_element_id, idea_lemons_images_element_id)
{
    var idea_lemons_count_element = document.getElementById(idea_lemons_count_element_id)
    var idea_lemons_count = +idea_lemons_count_element.innerHTML

    if(lemons_used + 1 <= lemons)
    {
        idea_lemons_count += 1
        lemons_used += 1

        var lemons_container = document.getElementById(idea_lemons_images_element_id)
        if (lemons_container.childNodes.length <= max_lemons_images)
        {
            var lemon_example = document.getElementById('lemon_example')
            var new_lemon = lemon_example.cloneNode(true)
            new_lemon.classList.remove('hidden')
            new_lemon.removeAttribute('id')
            lemons_container.appendChild(new_lemon)
        }
        else if (idea_lemons_count == max_lemons_images + 1)
        {
            var three_dots_example = document.getElementById('three-dots')
            var new_three_dots = three_dots_example.cloneNode(true)
            new_three_dots.classList.remove('hidden')
            new_three_dots.removeAttribute('id')
            var last_lemon = lemons_container.lastChild
            lemons_container.insertBefore(new_three_dots, last_lemon)
        }
    }

    idea_lemons_count_element.innerHTML = idea_lemons_count

    SetLemonsCount()
}

function RemoveLemon(idea_lemons_count_element_id, idea_lemons_images_element_id)
{
    var idea_lemons_count_element = document.getElementById(idea_lemons_count_element_id)
    var idea_lemons_count = +idea_lemons_count_element.innerHTML

    var difference = 0
    if(idea_lemons_count - 1 >= 0)
    {
        difference = 1
    }

    if(lemons_used - difference >= 0)
    {
        idea_lemons_count -= difference
        lemons_used -= difference
        if (difference == 1)
        {
            var lemons_container = document.getElementById(idea_lemons_images_element_id)
            if (idea_lemons_count == max_lemons_images)
            {
                var three_dots = lemons_container.childNodes[lemons_container.childNodes.length - 2]
                lemons_container.removeChild(three_dots)
            }
            else if (idea_lemons_count < max_lemons_images && idea_lemons_count >= 0)
            {
                var lemon_image = lemons_container.lastChild
                lemons_container.removeChild(lemon_image)
            }
        }
    }

    idea_lemons_count_element.innerHTML = idea_lemons_count

    SetLemonsCount()
}


function OnCheckClicked(checkbox, remove_button_id, add_button_id)
{
    if(checkbox.checked)
    {
        CheckIdea(remove_button_id, add_button_id)
    }
    else
    {
        UncheckIdea(remove_button_id, add_button_id)
    }
}

function CheckIdea(remove_button_id, add_button_id)
{
    var remove_button = document.getElementById(remove_button_id)
    var add_button = document.getElementById(add_button_id)

    if(ideas_evaluated + 1 <= ideas)
    {
        ideas_evaluated += 1
    }

    remove_button.disabled = true
    add_button.disabled = true

    SetIdeasCount()
}

function UncheckIdea(remove_button_id, add_button_id)
{
    var remove_button = document.getElementById(remove_button_id)
    var add_button = document.getElementById(add_button_id)

    if(ideas_evaluated - 1 >= 0)
    {
        ideas_evaluated -= 1
    }

    remove_button.disabled = false
    add_button.disabled = false

    SetIdeasCount()
}