// This file is part of InfiniteSky.
// Copyright (c) InfiniteSky Dev Teams - Licensed under GNU GPL
// For more information, see LICENCE in the main folder

/* jslint node: true */
/*global cli */


cli.clearguestaccounts = function CLI_ClearGuestAccounts(input) {
  if (!db) {
    console.log('Database not loaded yet');
    return;
  }

  db.Account.find({Username: {$regex: 'Guest' } }, '_id', function(err, docs){
    if (err) {
      dumpError(err);
      return;
    }
    
    for (var i = 0; i < docs.length; i++) {
      db.Character.remove({ 'AccountID': docs[i]._id });
    }

    console.log('Cleared guest accounts');
  });
};

cli.clearguestaccounts.help = function CLI_ClearGuestAccounts_help(input) {
  return 'Clears guest accounts.';
};