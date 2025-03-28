document.addEventListener('DOMContentLoaded', function() {
  const activitiesData = [
    {
      title: 'Swimming',
      description: 'Enjoy a refreshing swim in our pool.',
      timeSlots: ['Morning (9 AM - 12 PM)', 'Afternoon (1 PM - 4 PM)', 'Evening (5 PM - 8 PM)']
    },
    {
      title: 'Spa and Wellness',
      description: 'Indulge in relaxing spa treatments and rejuvenating wellness activities.',
      timeSlots: ['Morning (9 AM - 10 AM)','Morning (11 AM - 12 PM)','Afternoon (2 PM - 3 PM)','Evening (7 PM - 8 PM)','Night (10 PM - 11 PM)']
    },
    {
      title: 'Fitness and Sports',
      description: 'Stay active with our gym facilities, tennis courts, and sports tournaments.',
      timeSlots: ['Morning (9 AM - 12 PM)', 'Afternoon (1 PM - 4 PM)', 'Evening (5 PM - 8 PM)','Night (9 PM - 12 AM)']
    },
    {
      title: 'Adventure Sports',
      description: 'Experience thrilling adventures like zip-lining, rock climbing, and water sports.',
      timeSlots: ['Morning (9 AM - 12 PM)', 'Afternoon (1 PM - 4 PM)', 'Evening (5 PM - 8 PM)']
    },
    {
      title: 'Cultural Activities',
      description: 'Immerse yourself in local culture with cooking classes and art workshops.',
      timeSlots: ['Morning (9 AM - 12 PM)', 'Evening (5 PM - 8 PM)','Night (9 PM - 12 AM)']
    },
    {
      title: 'Nature Exploration',
      description: 'Discover scenic trails and enjoy nature walks around the resort.',
      timeSlots: ['Morning (9 AM - 12 PM)', 'Afternoon (1 PM - 4 PM)', 'Evening (5 PM - 8 PM)']
    },
    {
      title: 'Entertainment',
      description: 'Enjoy movie nights, live music, and themed parties.',
      timeSlots: ['Evening (5 PM - 8 PM)','Night (9 PM - 12 AM)']
    },
    {
      title: "Children's Activities",
      description: 'Kids can have fun at our kids\' club with various activities.',
      timeSlots: ['Morning (9 AM - 12 PM)', 'Afternoon (2 PM - 5 PM)']
    },
    {
      title: 'Culinary Experiences',
      description: 'Savor food tastings and join cooking demonstrations.',
      timeSlots: ['Morning (8 AM - 10 AM)', 'Afternoon (2 PM - 4 PM)', 'Evening (5 PM - 7 PM)','Night (9 PM - 11 PM)']
    },
    // {
    //   title: 'Relaxation and Leisure',
    //   description: 'Unwind at reading lounges or indulge in leisurely board games.',
    //   timeSlots: ['Available all day']
    // },
    // Add more activity objects as needed following the same format
  ];

  const activitiesContainer = document.querySelector('.activities');

  activitiesData.forEach(activity => {
    const activityCard = document.createElement('div');
    activityCard.classList.add('activity');

    const activityInput = document.createElement('input');
    activityInput.setAttribute('type', 'checkbox');
    activityInput.setAttribute('id', activity.title.toLowerCase());
    activityInput.setAttribute('name', 'activity');
    activityInput.setAttribute('value', activity.title);

    const activityLabel = document.createElement('label');
    activityLabel.setAttribute('for', activity.title.toLowerCase());
    
    const titleElement = document.createElement('h2');
    titleElement.textContent = activity.title;

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = activity.description;

    const openHoursParagraph = document.createElement('p');
    openHoursParagraph.textContent = 'Open hours:';

    const timeSlotsSelect = document.createElement('select');
    timeSlotsSelect.setAttribute('class', 'time-slot');
    timeSlotsSelect.setAttribute('multiple', '');

    activity.timeSlots.forEach(slot => {
      const option = document.createElement('option');
      option.setAttribute('value', slot.toLowerCase().replace(/ /g, '-'));
      option.textContent = slot;
      timeSlotsSelect.appendChild(option);
    });

    activityLabel.appendChild(titleElement);
    activityLabel.appendChild(descriptionParagraph);
    activityLabel.appendChild(openHoursParagraph);
    activityLabel.appendChild(timeSlotsSelect);

    activityCard.appendChild(activityInput);
    activityCard.appendChild(activityLabel);

    activitiesContainer.appendChild(activityCard);
  });
  const activityCards = document.querySelectorAll('.activity');

  activityCards.forEach(card => {
    card.addEventListener('click', function(event) {
      if (!event.target.classList.contains('time-slot')) {
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked; // Toggle checkbox when clicking the card
      }
    });
  });

  document.getElementById('submitBtn').addEventListener('click', function() {
    const selectedActivities = document.querySelectorAll('input[name="activity"]:checked');
    const selectedActivitiesArray = Array.from(selectedActivities).map(activity => {
      const activityName = activity.value;
      const timeSlots = Array.from(activity.parentElement.querySelectorAll('.time-slot option:checked')).map(slot => slot.textContent);
      return { activity: activityName, timeSlots: timeSlots };
    });

    displaySelectedActivities(selectedActivitiesArray);
  });

  function displaySelectedActivities(activities) {
    const selectedActivitiesDiv = document.getElementById('selectedActivities');
    selectedActivitiesDiv.innerHTML = '<h2>Selected Activities:</h2>';

    if (activities.length === 0) {
      selectedActivitiesDiv.innerHTML += '<p>No activities selected</p>';
    } else {
      activities.forEach(activity => {
        const activityDiv = document.createElement('div');
        activityDiv.innerHTML += `<h3>${activity.activity}</h3>`;

        if (activity.timeSlots.length === 0) {
          activityDiv.innerHTML += '<p>No time slots selected</p>';
        } else {
          const timeSlotsList = document.createElement('ul');
          activity.timeSlots.forEach(slot => {
            const listItem = document.createElement('li');
            listItem.textContent = slot;
            timeSlotsList.appendChild(listItem);
          });
          activityDiv.appendChild(timeSlotsList);
        }

        // Add a button to deselect the activity
        const deselectButton = document.createElement('button');
        deselectButton.textContent = 'Deselect';
        deselectButton.addEventListener('click', function() {
          const correspondingCheckbox = document.querySelector(`input[value="${activity.activity}"]`);
          correspondingCheckbox.checked = false; // Uncheck the checkbox
          displaySelectedActivities(getCurrentlySelectedActivities()); // Update the displayed selected activities
        });
        activityDiv.appendChild(deselectButton);

        selectedActivitiesDiv.appendChild(activityDiv);
      });
    }
  }

  // Helper function to get currently selected activities
  function getCurrentlySelectedActivities() {
    const selectedActivities = document.querySelectorAll('input[name="activity"]:checked');
    const selectedActivitiesArray = Array.from(selectedActivities).map(activity => {
      const activityName = activity.value;
      const timeSlots = Array.from(activity.parentElement.querySelectorAll('.time-slot option:checked')).map(slot => slot.textContent);
      return { activity: activityName, timeSlots: timeSlots };
    });
    return selectedActivitiesArray;
  }
  
  function displaySelectedActivities(activities) {
    const selectedActivitiesDiv = document.getElementById('selectedActivities');
    selectedActivitiesDiv.innerHTML = '<h2>Selected Activities:</h2>';

    if (activities.length === 0) {
      selectedActivitiesDiv.innerHTML += '<p>No activities selected</p>';
    } else {
      activities.forEach(activity => {
        const activityDiv = document.createElement('div');
        activityDiv.innerHTML += `<h3>${activity.activity}</h3>`;

        if (activity.timeSlots.length === 0) {
          activityDiv.innerHTML += '<p>No time slots selected</p>';
        } else {
          const timeSlotsList = document.createElement('ul');
          activity.timeSlots.forEach(slot => {
            const listItem = document.createElement('li');
            listItem.textContent = slot;
            timeSlotsList.appendChild(listItem);
          });
          activityDiv.appendChild(timeSlotsList);
        }

        // Add a button to deselect the activity
        const deselectButton = document.createElement('button');
        deselectButton.textContent = 'Deselect';
        deselectButton.classList.add('deselect-btn'); // Apply the deselect button style
        deselectButton.addEventListener('click', function() {
          const correspondingCheckbox = document.querySelector(`input[value="${activity.activity}"]`);
          correspondingCheckbox.checked = false; // Uncheck the checkbox
          displaySelectedActivities(getCurrentlySelectedActivities()); // Update the displayed selected activities
        });
        activityDiv.appendChild(deselectButton);

        selectedActivitiesDiv.appendChild(activityDiv);
      });
    }
  }

  // Helper function to get currently selected activities
  function getCurrentlySelectedActivities() {
    const selectedActivities = document.querySelectorAll('input[name="activity"]:checked');
    const selectedActivitiesArray = Array.from(selectedActivities).map(activity => {
      const activityName = activity.value;
      const timeSlots = Array.from(activity.parentElement.querySelectorAll('.time-slot option:checked')).map(slot => slot.textContent);
      return { activity: activityName, timeSlots: timeSlots };
    });
    return selectedActivitiesArray;
  }
  ``
});
