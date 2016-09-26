#!c:/strawberry/perl/bin/perl.exe
use strict;
use CGI;

# score.cgi
# Display score if access this by jQuery_ajax

my $cgi = new CGI;
print $cgi->header(-type => 'text/html');

# get the submitted form's data
my $team = $cgi->url_param('team');

if ($team eq 'india') {
	# display the employee details in a table
	print "<table border=1>";
	print "<tr><th colspan=2>$team</th></tr>";
	print "<tr><td>156/2</th><td>28 Overs</td></tr>";
	print "</table>";
}
else {
	print "";
}

