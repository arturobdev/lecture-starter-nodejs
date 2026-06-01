import {
    Button, Collapse, Dialog, DialogContent, DialogTitle,
    Paper, Typography, Box, Divider
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function FightHistory({ open, onClose, fights = [] }) {
    const [selectedFightId, setSelectedFightId] = useState(null);

    if (!fights || fights.length === 0) {
        return (
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Fight History</DialogTitle>
                <DialogContent>
                    <Typography>No fight records found.</Typography>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Fight History</DialogTitle>
            <DialogContent dividers>
                {fights.map((fight) => (
                    <Paper key={fight.id} sx={{ p: 2, mb: 2, bgcolor: '#f9f9f9' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight="bold">
                                {fight.fighter1Name} vs {fight.fighter2Name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {new Date(fight.createdAt).toLocaleString()}
                            </Typography>
                        </Box>

                        <Typography variant="body1" sx={{ my: 1 }}>
                            🏆 Winner: <strong>{fight.winner}</strong>
                        </Typography>

                        <Button
                            variant="text"
                            endIcon={selectedFightId === fight.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            onClick={() => setSelectedFightId(selectedFightId === fight.id ? null : fight.id)}
                        >
                            {selectedFightId === fight.id ? "Hide Details" : "View Battle Log"}
                        </Button>

                        <Collapse in={selectedFightId === fight.id}>
                            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #ddd' }}>
                                {fight.log.map((round, index) => (
                                    <Box key={index} sx={{ mb: 1.5, fontSize: '0.85rem' }}>
                                        <Typography variant="subtitle2" color="primary">Round {index + 1}</Typography>
                                        <Typography>
                                            ⚔️ {fight.fighter1Name} ({round.fighter1Shot}) vs
                                            {fight.fighter2Name} ({round.fighter2Shot})
                                        </Typography>
                                        <Typography color="text.secondary">
                                            ❤️ Health: {round.fighter1Health} - {round.fighter2Health}
                                        </Typography>
                                        {index < fight.log.length - 1 && <Divider sx={{ my: 1 }} />}
                                    </Box>
                                ))}
                            </Box>
                        </Collapse>
                    </Paper>
                ))}
            </DialogContent>
        </Dialog>
    );
}