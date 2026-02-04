#!/bin/bash

# Read hook input from stdin
input=$(cat)

# Extract the file path being edited
file_path=$(echo "$input" | jq -r '.tool_input.file_path')

# Check which folder is being edited and read corresponding .ai.md
project_dir="$CLAUDE_PROJECT_DIR"

if [[ "$file_path" == *"/src/page/"* ]]; then
  ai_md="$project_dir/src/page/.ai.md"
  guide_name="page"
elif [[ "$file_path" == *"/src/state/"* ]]; then
  ai_md="$project_dir/src/state/.ai.md"
  guide_name="state"
elif [[ "$file_path" == *"/src/app/"* ]]; then
  ai_md="$project_dir/src/app/.ai.md"
  guide_name="app"
elif [[ "$file_path" == *"/src/api/"* ]]; then
  ai_md="$project_dir/src/api/.ai.md"
  guide_name="api"
else
  exit 0
fi

# Read and output .ai.md if exists
if [ -f "$ai_md" ]; then
  echo "📖 $guide_name 가이드 지침 읽음" >&2
  content=$(cat "$ai_md")
  # Use jq to safely escape the content for JSON
  jq -n --arg content "$content" '{
    "decision": "approve",
    "reason": ("Context from .ai.md:\n\n" + $content)
  }'
fi

exit 0
