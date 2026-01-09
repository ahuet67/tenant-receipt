# tenant-receipt

Code used to

- Notify the rent not sent
- generate automatic tenant receipt and send it by email.

## Detail

The code is written in appscript and use google drive and gmail.

## TODO

- Just mention the bank where payment is received in tenantInfo. the <Bank>NotificationHandler should manage by their own how to catch if the proper amount has been sent in the message
- Connect the app to airtable instead of config file
- Send the default of payment file filled to the Virtual Assistant to do the verifications
- Move to the bin when the process is done
- Do not move to bin the file when command are executed => share it to AV
