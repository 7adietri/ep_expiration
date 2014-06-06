ep_expiration
=============
An Etherpad plugin for deleting inactive pads automatically.

Deletes pads that have not been modified for 30 days (once per hour).

Configuration
-------------
You can change the expiration time (or disable the plugin) by adding the
following entry to your `settings.json`:

    "ep_expiration" : {
      "enabled": true,
      "max_days": 30
    }

Then restart your Etherpad instance.
