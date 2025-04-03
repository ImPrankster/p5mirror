cd "/Users/ruofanwang/code/ims/p5mirror/downloads/../p5projects"
#
echo unzip 1 "ims-CONFETTI-OBkdVH_tD"
rm -rf "./ims-CONFETTI-OBkdVH_tD"
mkdir "./ims-CONFETTI-OBkdVH_tD"
pushd "./ims-CONFETTI-OBkdVH_tD" > /dev/null
unzip -q "../../downloads/zips/ims-CONFETTI-OBkdVH_tD"
popd > /dev/null

cd ..
# remove redundant p5.js p5.sound.min.js
rm -f p5projects/*/p5.*
# sync last_updatedAt.txt
cd downloads/json
if [ -e pending_updatedAt.txt ]; then
  rm -f last_updatedAt.txt
  mv pending_updatedAt.txt last_updatedAt.txt
fi