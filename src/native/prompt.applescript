-- on run (clp)
-- 	display dialog clp's item 2 with title clp's item 1 default answer clp's item 3 buttons {"Cancel", "OK"} default button 2
-- end run

on run (args)
    set dialogTitle to item 1 of args
    set dialogText to item 2 of args
    set defaultAnswer to item 3 of args

    display dialog dialogText with title dialogTitle default answer defaultAnswer buttons {"Cancel", "OK"} default button 2
end run