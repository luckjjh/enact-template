#!/bin/bash
echo "[Enact] Intall Enact CLI v5"
npm install @enact/cli@5.0.0-alpha.1
if [ $? -eq 0 ]; then
	echo "[Enact] npm install"
	npm install
	if [ $? -eq 0 ]; then
		echo "[Enact] npm run test:all"
		npm run test:all
		result="$(echo $?)"

		echo "[Enact] Test result : ${result}."
		if [ ${result} -eq 0 ];then
			exit 0
		else
			exit 1
		fi
	else
		echo "[Enact] Failed to install node modules."
		exit 1
	fi
else
	echo "[Enact] Failed to install Enact CLI."
	exit 1
fi


