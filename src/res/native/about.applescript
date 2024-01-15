on run (args)
    set versionArg to item 1 of args

    display dialog "Wakenator v" & versionArg & "\n\n" with title "About Wakenator" buttons {"Visit homepage", "Close"} default button 2

    if button returned of result is "Visit homepage" then
        open location "https://github.com/edus44/wakenator"
    end if
end run