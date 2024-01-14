on run (args)
    set dialogTitle to item 1 of args
    set dialogText to item 2 of args
    set defaultAnswer to item 3 of args
    set buttonText to item 4 of args

    display dialog dialogText with title dialogTitle default answer defaultAnswer buttons {"Cancel", buttonText} default button 2
end run