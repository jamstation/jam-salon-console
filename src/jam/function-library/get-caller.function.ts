export function getCaller ()
{
	const caller = ( new Error().stack.split( 'at ' )[ 3 ].split( ' (' )[ 0 ] ).split( '.' );
	return {
		className: caller[ 0 ],
		functionName: caller[ 1 ]
	}
}
