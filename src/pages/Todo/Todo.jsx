import { useGlobalState } from "../../main";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const Todo = () => {
    const state = useGlobalState();
    const [editCardIdx, setEditCardIdx] = useState(null);

    return (
        <div>
            <Button
                variant="outlined"
                disabled={editCardIdx !== null}
                onClick={() => {
                    GlobalState.set({
                        todos: [{ task: "", done: false }, ...state.todos],
                    });
                    setEditCardIdx(0);
                }}
            >
                Add +
            </Button>
            {state.todos.map((todo, idx) => {
                return (
                    <Box sx={{ minWidth: 275 }} key={idx}>
                        <Card variant="outlined">
                            <CardContent>
                                {editCardIdx === idx ? (
                                    <TextField
                                        id="filled-basic"
                                        label="Type task"
                                        variant="filled"
                                        value={todo.task}
                                        onChange={(e) =>
                                            GlobalState.set({
                                                todos: state.todos.with(idx, { ...todo, task: e.target.value }),
                                            })
                                        }
                                    />
                                ) : (
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {todo.task}
                                    </Typography>
                                )}
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {todo.done ? "Done" : "In progress"}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    disabled={editCardIdx !== idx && editCardIdx !== null}
                                    onClick={() => setEditCardIdx(editCardIdx === idx ? null : idx)}
                                >
                                    {editCardIdx === idx ? "Save" : "Edit"}
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        state.todos.splice(idx, 1);
                                        GlobalState.set({
                                            todos: [...state.todos],
                                        });
                                    }}
                                >
                                    Delete
                                </Button>
                                {editCardIdx !== idx && (
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            GlobalState.set({
                                                todos: state.todos.with(idx, { ...todo, done: !todo.done }),
                                            });
                                        }}
                                    >
                                        {todo.done ? "Mark in progress" : "Mark done"}
                                    </Button>
                                )}
                            </CardActions>
                        </Card>
                    </Box>
                );
            })}
        </div>
    );
};

export default Todo;
