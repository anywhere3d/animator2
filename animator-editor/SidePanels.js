//  SidePanels.js

    var pintipSelector = "#pin-tip";
    var neverShowAgainSelector = "#never-show-again";
    var leftPinbtnSelector = "#left-side-pinbtn";
    var rightPinbtnSelector = "#right-side-pinbtn";
    var leftSideContentSelector = "#left-side-content";
    var titleUnpin =  "click this pin to release the panel";
    var titlePin = "click this button to pin the panel";
    
    var pintip = $(pintipSelector)[0];
    var leftSidePinBtn = $(leftPinbtnSelector)[0];
    var rightSidePinBtn = $(rightPinbtnSelector)[0];
    
    function toggleSidePanel(button){
        button.pinned = !button.pinned;
        button.classList.toggle( "pinned", button.pinned );
        button.parentElement.classList.toggle( "pinned", button.pinned );
    };

//  Side Panels Pin buttons.
    
    if ( !!leftSidePinBtn ){
        leftSidePinBtn.pinned = false;
        $(leftPinbtnSelector).on("click", function(){
            this.pinned = !this.pinned; 
            this.classList.toggle( "pinned", this.pinned );
            this.parentElement.classList.toggle( "pinned", this.pinned );
        //  $(pintipSelector).width(170);
        //  if (this.pinned) $(pintipSelector).slideDown();
            if (this.pinned ) {
        //  source: "https://www.tutorialrepublic.com/codelab.php?topic=faq&file=jquery-slide-left-and-right-effect"            
                if ( !!$(pintipSelector) ) $(pintipSelector).animate({ width: 170 }, 250);
            } else {
                if ( !!$(pintipSelector) ) $(pintipSelector).animate({ width: 0 }, 250);
            }
        });
        $(leftPinbtnSelector).on("mouseenter", function(){
            if (this.pinned) this.title = titleUnpin; else this.title = titlePin;
        });
    //  Open left side panel.
    //  if (!isMobile && !leftSidePinBtn.pinned) toggleSidePanel(leftSidePinBtn);
    }
    
    if ( !!rightSidePinBtn ){
        rightSidePinBtn.pinned = false;
        $(rightPinbtnSelector).on("click", function(){
            this.pinned = !this.pinned; 
            this.classList.toggle( "pinned", this.pinned );
            this.parentElement.classList.toggle( "pinned", this.pinned );
        });
        $(rightPinbtnSelector).on("mouseenter", function(){
            if (this.pinned) this.title = titleUnpin; else this.title = titlePin;
        });
    //  Open right side panel.
    //  if (!rightSidePinBtn.pinned) toggleSidePanel(rightSidePinBtn);
    }

    $(neverShowAgainSelector).on("click", function(){
        //e.preventDefault();
        console.log(neverShowAgainSelector);
        var $pintip = $(pintipSelector);
        $pintip.detach();
        return false;
    });

    function animatepintip(){
        if (leftSidePinBtn.pinned) {
            leftSidePinBtn.title = titleUnpin; 
            if ( !!$(pintipSelector) ) $(pintipSelector).animate({ width: 170 }, 250);
        } else { 
            leftSidePinBtn.title = titlePin;
            if ( !!$(pintipSelector) ) $(pintipSelector).animate({ width: 0 }, 250);
        }
    }




































